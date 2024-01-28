import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";
import { years, months, days } from "../units/time";
import {
  countyList,
  cityListByCounty,
  zipCodeByCountryAndCity,
} from "../units/zipcodes";
import { IUser } from "../interface/User";
import { countyAndCityByZipCode } from "../units/zipcodes";
import { apiGetUser, apiPutUser } from "../apis/userApis";

type InputName =
  | "name"
  | "phone"
  | "year"
  | "month"
  | "day"
  | "county"
  | "city"
  | "detail";

type TUpdateUser = Record<InputName, string>;

const updateUserBaseInfoFormInputs: Array<IReactHookFormInput<InputName>> = [
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

const updateUserBirthdayInputs: Array<IReactHookFormInput<InputName>> = [
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

const updateUserAddressInputs: Array<IReactHookFormInput<InputName>> = [
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

const UpdateUserForm: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateUser>();

  const [user, setUser] = useState<IUser>();
  const [updateUser, setUpdateUser] = useState<TUpdateUser>({
    name: "",
    phone: "",
    year: "",
    month: "",
    day: "",
    county: "",
    city: "",
    detail: "",
  });
  const [county, setCounty] = useState("臺北市");
  const handleCountyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCounty(e.target.value);
  };

  const onSubmit = (data: TUpdateUser) => {
    console.log(data);
    const { name, phone, year, month, day, county, city, detail } = data;
    const birthday = `${year}-${month}-${day}`;
    const zipcode = zipCodeByCountryAndCity(county, city);
    if (!zipcode) return;
    const address = { zipcode, detail };
    const userInfo = { userId: user?._id, name, phone, birthday, address };
    const updateUser = async () => {
      try {
        console.log(userInfo);
        const res = await apiPutUser(userInfo);
        if (res && res.status) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateUser();
  };

  const formatUserInfo = (userInfo: IUser | undefined) => {
    if (!userInfo) return;
    const { name, phone, birthday, address } = userInfo;
    const [year, month, dayWithTime] = birthday.split("-");
    const [day] = dayWithTime.split("T");
    const { zipcode, detail } = address;
    const result = countyAndCityByZipCode(zipcode);
    const county = result?.county || "";
    const city = result?.city || "";
    setUpdateUser({
      name,
      phone,
      year,
      month: parseInt(month).toString(),
      day: parseInt(day).toString(),
      county,
      city,
      detail,
    });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await apiGetUser();
        if (res && res.status) {
          setUser(res.data.result);
          formatUserInfo(res.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    for (const key in updateUser) {
      setValue(
        key as keyof typeof updateUser,
        updateUser[key as keyof typeof updateUser]
      );
    }
  }, [updateUser, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {updateUserBaseInfoFormInputs.map(
        (input: IReactHookFormInput<InputName>) => {
          return (
            <div key={input.name}>
              <div className="mb-3">
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
      <div className="row align-items-end mb-3">
        {updateUserBirthdayInputs.map(
          (input: IReactHookFormInput<InputName>) => {
            return (
              <div className="col" key={input.name}>
                {input.type === "select" && (
                  <div>
                    <label className="form-label">{input.label}</label>
                    <select
                      className="form-select"
                      {...register(input.name, input.options)}
                    >
                      {input.name === "year" && (
                        <>
                          {years.map((year) => (
                            <option key={year.value} value={year.value}>
                              {year.text}
                            </option>
                          ))}
                        </>
                      )}
                      {input.name === "month" && (
                        <>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.text}
                            </option>
                          ))}
                        </>
                      )}
                      {input.name === "day" && (
                        <>
                          {days.map((day) => (
                            <option key={day.value} value={day.value}>
                              {day.text}
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
      <div className="row align-items-end mb-3">
        {updateUserAddressInputs.map(
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
      <input type="submit" value="儲存設定" className="btn btn-secondary" />
    </form>
  );
};

export default UpdateUserForm;
