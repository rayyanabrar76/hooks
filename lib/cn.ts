/**
 * Tiny classNames joiner — filters falsy values so we can write
 * cn("base", condition && "active"). Kept dependency-free on purpose.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
