using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson;
using System;
public class IdSerializer : SerializerBase<string>
{
    public override string Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var bsonType = context.Reader.GetCurrentBsonType();
        
        switch (bsonType)
        {
            case BsonType.Int32:
                return context.Reader.ReadInt32().ToString();
            case BsonType.Int64:
                return context.Reader.ReadInt64().ToString();
            case BsonType.String:
                return context.Reader.ReadString();
            default:
                throw new NotSupportedException($"Tipo de dato no soportado: {bsonType}");
        }
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, string value)
    {
        context.Writer.WriteString(value);
    }
}
