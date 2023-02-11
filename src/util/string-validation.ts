export const snakeCasePattern = "^[a-z0-9]+(_[a-z0-9]+)*$";

export const spaceToUnderscore = (str: string) => str.replace(/\s/g, "_");
