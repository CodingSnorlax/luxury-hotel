// import react-hook-form
import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";

type InputName = "oldPassword" | "newPassword" | "checkNewPassword";
type TUpdatePW = Record<InputName, string>;

const resetPWFormInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "oldPassword",
    label: "舊密碼",
    placeholder: "請輸入舊密碼",
    type: "password",
    options: {
      required: {
        value: true,
        message: "請輸入舊密碼",
      },
    },
  },
  {
    name: "newPassword",
    label: "新密碼",
    placeholder: "請輸入新密碼",
    type: "password",
    options: {
      required: {
        value: true,
        message: "請輸入新密碼",
      },
      minLength: {
        value: 6,
        message: "密碼長度不足, 最少 6 碼",
      },
      maxLength: {
        value: 12,
        message: "密碼長度太長, 最多 20 碼",
      },
    },
  },
  {
    name: "checkNewPassword",
    label: "確認新密碼",
    placeholder: "請再次輸入一次新密碼",
    type: "password",
    options: {
      required: {
        value: true,
        message: "請再次輸入一次新密碼",
      },
      minLength: {
        value: 6,
        message: "密碼長度不足, 最少 6 碼",
      },
      maxLength: {
        value: 12,
        message: "密碼長度太長, 最多 20 碼",
      },
    },
  },
];

function UpdatePWForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TUpdatePW>();
  const onSubmit = (data: TUpdatePW) => {
    console.log(data);
    if (data.newPassword !== data.checkNewPassword) {
      setError("checkNewPassword", {
        type: "manual",
        message: "新密碼和確認新密碼不相同",
      });
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {resetPWFormInputs.map((input: IReactHookFormInput<InputName>) => {
        return (
          <div className="mb-3" key={input.name}>
            <label className="form-label">{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              placeholder={input.placeholder}
              {...register(input.name, input.options)}
            />
            {errors[input.name] && (
              <p className="text-danger" role="alert">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        );
      })}
      <input type="submit" value="儲存設定" className="btn btn-primary" />
    </form>
  );
}

export default UpdatePWForm;
