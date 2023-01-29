export enum PSQLNumericType {
  /** 8 byte large-range integer */
  BIGINT = "BIGINT",
  /** 8 byte auto incrementing integer */
  BIGSERIAL = "BIGINT",
  /** variable length user-specified precision */
  DECIMAL = "DECIMAL",
  /** 8 byte floating point number */
  DOUBLE_PRECISION = "DOUBLE PRECISION",
  /** 4 byte number */
  INTEGER = "INTEGER",
  /** variable length user-specified precision */
  NUMERIC = "NUMERIC",
  /** 4 byte floating point number */
  REAL = "REAL",
  /** 2 byte integer */
  SMALLINT = "SMALLINT",
  /** 2 byte auto incrementing integer */
  SMALLSERIAL = "SMALLSERIAL",
  /** 4 byte auto incrementing integer */
  SERIAL = "SERIAL",
}

export enum PSQLMonetaryType {
  /** 8 byte floating point number */
  MONEY = "MONEY",
}

export enum PSQLCharacterType {
  /** 1 byte character */
  CHAR = "CHAR",
  /** 1 byte character */
  CHARACTER = "CHARACTER",
  /** variable length character */
  CHARACTER_VARYING = "CHARACTER VARYING",
  /** variable length character */
  TEXT = "TEXT",
  /** variable length character */
  VARCHAR = "VARCHAR",
}

export enum PSQLBinaryType {
  /** variable length binary */
  BYTEA = "BYTEA",
  /** variable length binary */
  BIT_VARYING = "BIT VARYING",
  /** variable length binary */
  VARBIT = "VARBIT",
}

export enum PSQLDateTimeType {
  DATE = "DATE",
  INTERVAL = "INTERVAL",
  TIME = "TIME",
  /** date and time no timezone */
  TIMESTAMP = "TIMESTAMP",
  /** date and time with timezone */
  TIMESTAMPTZ = "TIMESTAMPTZ",
}

export enum PSQLBooleanType {
  /** boolean */
  BOOLEAN = "BOOLEAN",
}

export enum PSQLNetworkType {
  /** 7-byte or 19-byte bytIPv4 or IPv6 host address */
  INET = "INET",
  /** 7-byte or 19-byte IPv4 or IPv6 host address and netmask */
  CIDR = "CIDR",
  /** 4-byte MAC (Media Access Control) address */
  MACADDR = "MACADDR",
  /** 8-byte MAC (Media Access Control) address (EUI-64 format) */
  MACADDR8 = "MACADDR8",
}

export enum PSQLGeometryType {
  /** geometric box */
  BOX = "BOX",
  /** geometric circle */
  CIRCLE = "CIRCLE",
  /** geometric line */
  LINE = "LINE",
  /** geometric line segment */
  LSEG = "LSEG",
  /** geometric path */
  PATH = "PATH",
  /** geometric polygon */
  POLYGON = "POLYGON",
  /** geometric point */
  POINT = "POINT",
}

export enum PSQLJsonType {
  /** json */
  JSON = "JSON",
  /** jsonb */
  JSONB = "JSONB",
}

export enum PSQLUuidType {
  /** universally unique identifier */
  UUID = "UUID",
}

export enum PSQLXmlType {
  /** xml */
  XML = "XML",
}

export enum PSQLTextSearchType {
  /** full-text search query */
  TSQUERY = "TSQUERY",
  /** full-text search document */
  TSVECTOR = "TSVECTOR",
}

export enum PSQLAliases {
  /** 4 byte number */
  INT = "INT",
  /** 2 byte number */
  INT2 = "INT2",
  /** 4 byte number */
  INT4 = "INT4",
  /** 8 byte number */
  INT8 = "INT8",
  /** 4 byte floating point number */
  FLOAT4 = "FLOAT4",
  /** 8 byte floating point number */
  FLOAT8 = "FLOAT8",
  /** 4 byte auto incrementing integer */
  SERIAL4 = "SERIAL4",
  /** 8 byte auto incrementing integer */
  SERIAL8 = "SERIAL8",
}

export enum PSQLEnumType {
  /**  enumerated type */
  ENUM = "ENUM",
}

/**
 * All PostgreSQL data types
 *
 * Currently this is a union of all the types, but it could be changed to a
 * string literal union in the future.
 */
export type PSQLDataTypes =
  | PSQLNumericType
  | PSQLMonetaryType
  | PSQLCharacterType
  | PSQLBinaryType
  | PSQLDateTimeType
  | PSQLBooleanType
  | PSQLNetworkType
  | PSQLGeometryType
  | PSQLJsonType
  | PSQLUuidType
  | PSQLXmlType
  | PSQLTextSearchType
  | PSQLAliases
  | PSQLEnumType;
