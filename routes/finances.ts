import { Hono } from "hono";
import { Model } from "../models/finances.ts";
import { AESCipher } from "../utils/cryptography.ts";

const finances = new Hono();

finances.get("/:secretKey", async (c) => {
  try {
    const secretKey: string = c.req.param("secretKey");

    const cipher = new AESCipher();
    const encrypted = cipher.encrypt(secretKey);

    const finance = await Model.find({ secretKey: encrypted });
    if (!finance) throw new Error("Finanças não encontradas");
    return c.text(JSON.stringify({ success: true, finance }));
  } catch (error: any) {
    return c.text(JSON.stringify({ success: false, message: error.message }));
  }
});

finances.post("/add", async (c) => {
  try {
    const finance = new Model(await c.req.json());
    const secretKey = finance.get("secretKey");
    const cipher = new AESCipher();
    const encrypted = cipher.encrypt(secretKey);
    finance.set("secretKey", encrypted);
    await finance.save();
    return c.text(JSON.stringify({ success: true, finance }));
  } catch (error: any) {
    return c.text(JSON.stringify({ success: false, message: error.message }));
  }
});

finances.delete("remove/:id", async (c) => {
  try {
    const id: string = c.req.param("id");
    const deleted = await Model.findByIdAndDelete(id);
    if (deleted)
      return c.text(
        JSON.stringify({ success: true, message: "Finance deleted!" })
      );
    else throw new Error("Finance not found");
  } catch (error: any) {
    return c.text(JSON.stringify({ success: false, message: error.message }));
  }
});

export default finances;
