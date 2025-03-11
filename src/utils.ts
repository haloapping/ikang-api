export function slugify(str: string, lowercase: boolean = true): string {
  if (lowercase === true) {
    return str.toLowerCase().replace(" ", "-");
  }

  return str.replace(" ", "-");
}
