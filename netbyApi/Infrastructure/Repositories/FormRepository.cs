using System;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
namespace Infrastructure.Repositories;

public class FormRepository
{
    private readonly IMongoCollection<BsonDocument> _personasCollection;
    private readonly IMongoCollection<BsonDocument> _mascotasCollection;

    public FormRepository(IConfiguration configuration)
    {
        var client = new MongoClient(configuration["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(configuration["MongoDB:DatabaseName"]);

        _personasCollection = database.GetCollection<BsonDocument>("personas");
        _mascotasCollection = database.GetCollection<BsonDocument>("mascotas");
    }

public async Task<List<Form>> GetAllFormsAsync()
{
    var personasRaw = await _personasCollection.Find(_ => true).ToListAsync();
    var mascotasRaw = await _mascotasCollection.Find(_ => true).ToListAsync();

    var allForms = new List<Form>();

    foreach (var doc in personasRaw.Concat(mascotasRaw))
    {
        var form = new Form
        {
            // 🔹 Priorizar el campo "id" si existe, de lo contrario, usar "_id"
            Id = doc.Contains("id") ? doc["id"].ToString() : (doc.Contains("_id") ? doc["_id"].ToString() : ""),
            Name = doc.Contains("name") ? doc["name"].ToString() : "Sin nombre",
            Inputs = doc.Contains("inputs") && doc["inputs"].IsBsonArray
                ? doc["inputs"].AsBsonArray.Select(input =>
                    {
                        var inputDoc = input.AsBsonDocument;
                        return new InputField
                        {
                            Id = inputDoc.Contains("id") ? inputDoc["id"].ToString() : "",
                            Name = inputDoc["name"].ToString(),
                            Type = inputDoc["type"].ToString(),
                            Placeholder = inputDoc["placeholder"].ToString(),
                            Required = inputDoc["required"].ToBoolean()
                        };
                    }).ToList()
                : new List<InputField>()
        };

        allForms.Add(form);
    }

    return allForms;
}
public async Task<Form?> GetFormByIdAsync(string id)
{
    var collection = _personasCollection;
    BsonValue bsonId;

    if (ObjectId.TryParse(id, out ObjectId objId))
        bsonId = objId;
    else
        bsonId = id;  

    var doc = await collection.Find(new BsonDocument("id", bsonId)).FirstOrDefaultAsync()
        ?? await _mascotasCollection.Find(new BsonDocument("id", bsonId)).FirstOrDefaultAsync()
        ?? await _personasCollection.Find(new BsonDocument("_id", bsonId)).FirstOrDefaultAsync()
        ?? await _mascotasCollection.Find(new BsonDocument("_id", bsonId)).FirstOrDefaultAsync();

    return doc != null ? new Form
    {
        Id = doc.Contains("id") ? doc["id"].ToString() : (doc.Contains("_id") ? doc["_id"].ToString() : ""),
        Name = doc["name"].ToString(),
        Inputs = doc.Contains("inputs") && doc["inputs"].IsBsonArray
            ? doc["inputs"].AsBsonArray.Select(input =>
                {
                    var inputDoc = input.AsBsonDocument;
                    return new InputField
                    {
                        Id = inputDoc["id"].ToString(),
                        Name = inputDoc["name"].ToString(),
                        Type = inputDoc["type"].ToString(),
                        Placeholder = inputDoc["placeholder"].ToString(),
                        Required = inputDoc["required"].ToBoolean()
                    };
                }).ToList()
            : new List<InputField>()
    } : null;
}
public async Task CreateOrUpdateFormAsync(Form form, bool isPerson)
{
    var collection = isPerson ? _personasCollection : _mascotasCollection;

    // 🟢 Generamos un ID numérico único si no tiene uno
    if (string.IsNullOrEmpty(form.Id))
    {
        form.Id = await GenerateUniqueNumericIdAsync(isPerson);
    }

    // 🟢 Asignamos IDs únicos a los inputs si no tienen
    foreach (var input in form.Inputs)
    {
        if (string.IsNullOrEmpty(input.Id))
        {
            input.Id = Guid.NewGuid().ToString("N"); // ID único para cada input
        }
    }

    var filter = Builders<BsonDocument>.Filter.Eq("id", form.Id);
    var update = new BsonDocument("$set", new BsonDocument
    {
        { "id", form.Id },
        { "name", form.Name },
        { "inputs", new BsonArray(form.Inputs.Select(input => new BsonDocument
            {
                { "id", input.Id },
                { "name", input.Name },
                { "type", input.Type },
                { "placeholder", input.Placeholder },
                { "required", input.Required }
            })) }
    });

    // ✅ `UpdateOneAsync` con `IsUpsert = true` es suficiente para crear o actualizar
    await collection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true });

    // ❌ Eliminamos esta inserción redundante
    // if (result.MatchedCount == 0)
    // {
    //     await collection.InsertOneAsync(new BsonDocument { ... });
    // }
}

    private async Task<string> GenerateUniqueNumericIdAsync(bool isPerson)
    {
        var collection = isPerson ? _personasCollection : _mascotasCollection;
        var random = new Random();
        int newId;

        while (true)
        {
            newId = random.Next(1, int.MaxValue); 
            var filter = Builders<BsonDocument>.Filter.Eq("id", newId.ToString());
            var existing = await collection.Find(filter).FirstOrDefaultAsync();

            if (existing == null)
            {
                break; 
            }
        }

        return newId.ToString();
    }

    
    public async Task UpdateFormAsync(string id, Form form, bool isPerson)
    {
        var collection = isPerson ? _personasCollection : _mascotasCollection;
        var filter = Builders<BsonDocument>.Filter.Eq("id", id);

        var update = new BsonDocument("$set", new BsonDocument
        {
            { "name", form.Name },
            { "inputs", new BsonArray(form.Inputs.Select(input => new BsonDocument
                {
                    { "id", input.Id },
                    { "name", input.Name },
                    { "type", input.Type },
                    { "placeholder", input.Placeholder },
                    { "required", input.Required }
                }))}
        });

        await collection.UpdateOneAsync(filter, update);
    }

 
    public async Task DeleteFormAsync(string id, bool isPerson)
    {
        var collection = isPerson ? _personasCollection : _mascotasCollection;
        var filter = Builders<BsonDocument>.Filter.Eq("id", id);
        await collection.DeleteOneAsync(filter);
    }
}
