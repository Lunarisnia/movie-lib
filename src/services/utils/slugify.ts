import assert from "assert";
import { v4 as uuidV4 } from "uuid";
/**
 * Generate slug from a given string
 */
export default (text: string) => {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + `-${uuidV4()}`
  );
};
