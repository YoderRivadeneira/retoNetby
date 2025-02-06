// 📌 Form.cs - Modelo de la entidad
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Form
    {
         [BsonId]
        [BsonRepresentation(BsonType.String)] 
        public string Id { get; set; }  = string.Empty; 

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("inputs")]
        public List<InputField> Inputs { get; set; } = new();
    }

    public class InputField
    {
        [BsonElement("id")]
        public string Id { get; set; } = string.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("type")]
        public string Type { get; set; } = "text";

        [BsonElement("placeholder")]
        public string Placeholder { get; set; } = string.Empty;

        [BsonElement("required")]
        public bool Required { get; set; } = false;
    }
}
