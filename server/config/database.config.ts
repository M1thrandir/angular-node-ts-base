const databaseName = "nodeTsBase"
const databaseType = "mongodb"

export const DatabaseSettings = {
  useMongo: true,
  seedMongo: true,
  databaseName: databaseName,
  db: {
    seed: "localhost/" + databaseName,
    uri: databaseType + "://localhost/" + databaseName,
    options: {
      db: {
        safe: true
      },
      config: {
        autoIndex: false
      }
    }
  }
}
