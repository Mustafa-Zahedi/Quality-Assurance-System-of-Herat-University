import React, { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Select = ({
  name,
  Type,
  Controller,
  control,
  options,
  label,
  itemNumber,
  placeholder,
  errors,
  setSelectedOptions,
  className,
  defaultValue,
  resetField,
  setSelected,
  reset,
}) => {
  // console.log("def", defaultValue, "type", Type);
  const [selectedItem, setSelectedItem] = useState([]);

  useMemo(() => {
    setSelectedOptions && setSelectedOptions(selectedItem);
    if (name === "facultyId") {
      resetField("departmentId");
    }
  }, [name, resetField, selectedItem, setSelectedOptions]);

  useEffect(() => {
    setSelectedItem([defaultValue?.[0] || placeholder, 0]);
    // console.log("useEffect", selectedItem);
  }, [defaultValue, placeholder, reset]);

  // console.log("select", selectedItem);

  return (
    <Controller
      control={control}
      defaultValue={
        defaultValue ? defaultValue?.[1] : Type && Type === "number" ? null : ""
      }
      name={name}
      render={({ field: { onChange } }) => (
        <Listbox
          onChange={(e) => {
            // console.log(e, "onchange");
            onChange(e[1]);
            setSelected && setSelected(e[1]);
            setSelectedItem(e);
          }}
          as={"div"}
          value={defaultValue || selectedItem}
          className="relative flex items-center gap-3"
          disabled={className}
        >
          {({ open }) => (
            <>
              {/* <Listbox.Label className="block text-sm font-medium">
                {label}
              </Listbox.Label> */}
              <div className="relative mt-1 flex w-fit min-w-[8rem]">
                <Listbox.Button
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 text-right shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 sm:text-sm disabled:text-gray-300"
                  disabled={className}
                >
                  <span className="block truncate">{selectedItem[0]}</span>
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-1 ml-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-150 ease-out"
                  enterFrom="transform scale-90 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-90 opacity-0"
                >
                  <Listbox.Options className="absolute top-10 w-[10rem] z-10 mt-1 max-h-60  overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options?.map((opt, ndx) => (
                      <Listbox.Option
                        key={ndx}
                        value={opt}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-cyan-600" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-8 pr-4"
                          )
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block"
                              )}
                            >
                              {opt[0]}
                              {opt?.[2] && `(${opt?.[2]})`}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-cyan-600",
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
                {errors[name] && (
                  <p className="text-red-500 text-xs">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            </>
          )}
        </Listbox>
      )}
    />
  );
};

export default Select;
