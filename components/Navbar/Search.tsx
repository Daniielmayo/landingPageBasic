"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
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
    // <div>
    <Input
      isClearable
      radius="lg"
      className="w-[80%] md:w-[60%] lg:w-[40%]"
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-xl",
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focused=true]:bg-default-200/50",
          "dark:group-data-[focused=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
      placeholder="Buscar..."
      startContent={
        <SearchIcon
          className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
          style={{ color: "var(--blue)" }}
        />
      }
      value={searchTerm}
      onChange={handleChange}
      onClear={handleClear}
    />
    // </div>
  );
};
