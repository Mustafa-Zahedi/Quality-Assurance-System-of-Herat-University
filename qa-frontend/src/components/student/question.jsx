import { RadioGroup } from "@headlessui/react";

const Options = [
  { name: "عالی", value: 4 },
  { name: "خوب", value: 3 },
  { name: "متوسط", value: 2 },
  { name: "کم", value: 1 },
  { name: "خیلی کم", value: 0 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Question = ({ Controller, control, errors, name, question }) => {
  // const [options, setOptions] = useState(Options[2]);
  // console.log(errors);
  return (
    <Controller
      control={control}
      defaultValue={""}
      name={name}
      rules={{
        required: {
          value: true,
          message: "لطفا یکی از گزینه ها را انتخاب نمایید",
        },
      }}
      render={({ field: { onChange } }) => (
        <div className="my-1 pt-5 grid w-full">
          <RadioGroup
            // value={options}
            onChange={(e) => {
              onChange(e.value);
              // setOptions(e);
              console.log(e);
            }}
            className="mt-2 w-full"
          >
            <RadioGroup.Label>{question}</RadioGroup.Label>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 md:grid-cols-5">
              {Options.map((option) => (
                <RadioGroup.Option
                  key={option.name}
                  value={option}
                  className={({ active, checked }) =>
                    classNames(
                      active ? "ring-2 ring-offset-2 ring-cyan-500" : "",
                      checked
                        ? "bg-cyan-600 border-transparent text-white hover:bg-cyan-700"
                        : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                      "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover:cursor-pointer"
                    )
                  }
                >
                  <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
            {errors[name] && (
              <p className="text-red-500 text-xs">{errors[name]?.message}</p>
            )}
          </RadioGroup>
        </div>
      )}
    />
  );
};

export default Question;
