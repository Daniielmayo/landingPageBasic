"use client";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { SearchIcon } from "../icons/icons";
import { log } from "console";

interface Props {
  onSearch: (term: string) => void;
}

export const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch(""); // Llamar a la función de búsqueda con una cadena vacía para indicar que se borró el término de búsqueda
  };
  return (
    <div className="flex w-full flex-wrap items-center justify-center md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        labelPlacement={"outside"}
        label="Buscar producto"
        radius="md"
        className="w-[80%] md:w-[60%] lg:w-[40%]"
        // placeholder="  Buscar..."
        endContent={<SearchIcon style={{ color: "var(--blue)" }} />}
        value={searchTerm}
        onChange={handleChange}
        onClear={handleClear}
        classNames={{
          input: "px-4 py-2",
        }}
      />
    </div>
  );
};
