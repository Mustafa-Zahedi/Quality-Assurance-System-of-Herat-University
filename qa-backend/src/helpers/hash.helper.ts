import bcryptjs from "bcryptjs";

export const hashData = async (payload: string): Promise<string> => {
  return await bcryptjs.hash(payload, 10);
};

export const isHashValid = async (
  text: string,
  hashedData: string
): Promise<boolean> => {
  return await bcryptjs.compare(text, hashedData);
};
