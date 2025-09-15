// src/services/api.js
import { supabase } from "./supabase";

// Fungsi umum untuk operasi CRUD
export const fetchData = async (table, params = {}) => {
  const { data, error } = await supabase.from(table).select("*").match(params);

  if (error) throw error;
  return data;
};

export const insertData = async (table, data) => {
  const { data: insertedData, error } = await supabase
    .from(table)
    .insert(data)
    .select();

  if (error) throw error;
  return insertedData;
};

export const updateData = async (table, id, data) => {
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq("id", id)
    .select();

  if (error) throw error;
  return updatedData;
};

export const deleteData = async (table, id) => {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) throw error;
};
