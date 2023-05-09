# `tauri-sql-orm`

### Description of tauri-plugin-sql-api's ORM encapsulation

The tauri-plugin-sql-api is a powerful plugin that allows developers to easily access SQL databases in their Tauri applications. One of the key features of this plugin is its ORM encapsulation, which provides a convenient and intuitive way to work with database records.

With the ORM encapsulation, developers no longer need to write raw SQL queries to interact with their database. Instead, they can use the provided API methods to perform operations such as creating, reading, updating, and deleting records. The ORM encapsulation also handles data validation and type conversion, ensuring that only valid data is stored in the database.

Furthermore, the tauri-plugin-sql-api's ORM encapsulation supports multiple database types, including MySQL, PostgreSQL, and SQLite. This makes it a versatile tool for developers working with different database technologies.

Overall, the ORM encapsulation feature of the tauri-plugin-sql-api simplifies database management and improves application scalability by providing a high-level, object-oriented interface to work with database records.

### Install dependencies


``` sh
npm i @hyjs/tauri-sql-orm -S

#or yarn

yarn add @hyjs/tauri-sql-orm -S

#or pnpm

pnpm i @hyjs/tauri-sql-orm -S
```

### USE

#### instantiation
``` ts
// sqlite
const db = new SqlORM('sqlite:db.db');

// mysql
const db = new SqlORM('mysql://user:pass@localhost:3306/db');

// postgres
const db = new SqlORM('postgres://user:pass@localhost:5432/db');
```

#### create model

``` ts
import { DataTypes } from '@hyjs/tauri-sql-orm';

const TestDB = await db.define('test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
```

#### Automatically create a table
``` ts
TestDB.sync();
```
If you need to create the table, you may need to use `force`.

The force will delete before the table and then recreated

``` ts
TestDB.sync({ force: true });
```

#### create data
``` ts
await TestDB.create({
  name: 'test',
  text: 1
});
```

#### bulkCreate data
``` ts
await TestDb.bulkCreate([
  {
    name: 'test',
    text: 1
  },
  {
    name: 'test',
    text: 1
  }
]);
```

#### findAll
``` ts
await TestDB.findAll();
```

#### findOne
``` ts
await TestDB.findOne({
  name: 'test'
});
```

#### drop table
``` ts
await TestDB.drop();
```