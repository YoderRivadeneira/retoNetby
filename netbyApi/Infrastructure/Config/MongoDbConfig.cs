using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Infrastructure.Config
{
    public class MongoDbConfig
    {
        public IMongoDatabase Database { get; }

        public MongoDbConfig(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDB:ConnectionString"]);
            Database = client.GetDatabase(configuration["MongoDB:DatabaseName"]);
        }
    }
}
