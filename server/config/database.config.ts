const databaseName = "node-ts-base"
const databaseType = "mongodb"

export const DatabaseSettings = {
  useMongo: true,
  seedMongo: false,
  databaseName: databaseName,
  db: {
    seed: "localhost/" + databaseName,
    uri: databaseType + "://localhost/" + databaseName,
    options: {
      useMongoClient: true,
      db: {
        safe: true
      },
      config: {
        autoIndex: false
      }
    }
  }
}
