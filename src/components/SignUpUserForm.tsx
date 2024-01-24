import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";
import { years, months, daysByDate } from "../units/time";
import { countyList, cityListByCounty } from "../units/zipcodes";
import { UserData } from "../interface/Form";
interface Props {
  handleComplete: (userData: UserData) => void;
}
type InputName =
  | "name"
  | "phone"
  | "year"
  | "month"
  | "day"
  | "county"
  | "city"
  | "detail";
type TSignUpUser = Record<InputName, string>;

const signUpUserBaseInfoFormInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "name",
    label: "姓名",
    placeholder: "請輸入姓名",
    type: "text",
    options: {
      required: {
        value: true,
        message: "請輸入姓名",
      },
    },
  },
  {
    name: "phone",
    label: "電話",
    placeholder: "請輸入電話",
    type: "tel",
    options: {
      required: {
        value: true,
        message: "請輸入電話",
      },
    },
  },
];

const signUpUserBirthdayInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "year",
    label: "生日",
    placeholder: "請輸入年",
    type: "select",
    options: {
      required: {
        value: true,
        message: "請輸入年",
      },
    },
  },
  {
    name: "month",
    label: "",
    placeholder: "請輸入月",
    type: "select",
    options: {
      required: {
        value: true,
        message: "請輸入月",
      },
    },
  },
  {
    name: "day",
    label: "",
    placeholder: "請輸入日",
    type: "select",
    options: {
      required: {
        value: true,
        message: "請輸入日",
      },
    },
  },
];

const signUpUserAddressInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "county",
    label: "地址",
    placeholder: "請輸入縣市",
    type: "select",
    options: {
      required: {
        value: true,
        message: "請輸入縣市",
      },
    },
  },
  {
    name: "city",
    label: "",
    placeholder: "請輸入鄉鎮市區",
    type: "select",
    options: {
      required: {
        value: true,
        message: "請輸入鄉鎮市區",
      },
    },
  },
  {
    name: "detail",
    label: "",
    placeholder: "請輸入詳細地址",
    type: "text",
    options: {
      required: {
        value: true,
        message: "請輸入詳細地址",
      },
    },
  },
];

function SignUpUserForm({ handleComplete }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<TSignUpUser>();
  const onSubmit = (data: TSignUpUser) => {
    handleComplete(data);
  };
  const [year, setYear] = useState("1911");
  const [month, setMonth] = useState("1");
  const handleDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else if (e.target.name === "month") {
      setMonth(e.target.value);
    }
  };
  const [county, setCounty] = useState("臺北市");
  const handleCountyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCounty(e.target.value);
  };
  const [isRead, setIseRead] = useState(false);
  const handleIsReadChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIseRead(e.target.checked);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpUserBaseInfoFormInputs.map(
        (input: IReactHookFormInput<InputName>) => {
          return (
            <div key={input.name}>
              <div className="mb-4">
                <label className="form-label">{input.label}</label>
                <input
                  type={input.type}
                  className="form-control"
                  placeholder={input.placeholder}
                  {...register(input.name, input.options)}
                />
                {errors[input.name] && (
                  <p className="text-danger" role="alert">
                    {errors[input.name]?.message as string}
                  </p>
                )}
              </div>
            </div>
          );
        }
      )}
      <div className="row align-items-end mb-4">
        {signUpUserBirthdayInputs.map(
          (input: IReactHookFormInput<InputName>) => {
            return (
              <div className="col" key={input.name}>
                {input.type === "select" && (
                  <div>
                    <label className="form-label">{input.label}</label>
                    <select
                      className="form-select"
                      {...register(input.name, input.options)}
                      onChange={
                        input.name === "year" || input.name === "month"
                          ? (e) => handleDateChange(e)
                          : () => {}
                      }
                    >
                      {input.name === "year" && (
                        <>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </>
                      )}
                      {input.name === "month" && (
                        <>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </>
                      )}
                      {input.name === "day" && (
                        <>
                          {daysByDate(year, month).map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
      <div className="row align-items-end mb-4">
        {signUpUserAddressInputs.map(
          (input: IReactHookFormInput<InputName>) => {
            return (
              <div
                className={input.type === "select" ? "col-6" : "col"}
                key={input.name}
              >
                {input.type === "select" && (
                  <div>
                    <label className="form-label">{input.label}</label>
                    <select
                      className="form-select"
                      {...register(input.name, input.options)}
                      onChange={
                        input.name === "county"
                          ? (e) => handleCountyChange(e)
                          : () => {}
                      }
                    >
                      {/* // countyList option */}
                      {input.name === "county" && (
                        <>
                          {countyList.map((county) => (
                            <option key={county} value={county}>
                              {county}
                            </option>
                          ))}
                        </>
                      )}
                      {/* // cityList option */}
                      {input.name === "city" && (
                        <>
                          {cityListByCounty(county).map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                )}
                {input.type === "text" && (
                  <div>
                    <label className="form-label">{input.label}</label>
                    <input
                      type={input.type}
                      className="form-control"
                      placeholder={input.placeholder}
                      {...register(input.name, input.options)}
                    />
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
      <div className="mb-10 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isReaded"
          onChange={(e) => handleIsReadChange(e)}
        />
        <label className="form-check-label fw-bold" htmlFor="isReaded">
          我已閱讀並同意本網站個資使用規範
        </label>
      </div>
      <input
        type="submit"
        value="完成註冊"
        className="btn btn-primary text-white fw-bold w-100 mb-4"
        disabled={!isRead}
      />
    </form>
  );
}

export default SignUpUserForm;
