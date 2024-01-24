import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";

interface Props {
  setPWData: (data: TSignUpPW) => void;
  setProgressNum: (number: number) => void;
}
type InputName = "email" | "password" | "checkPassword";
type TSignUpPW = Record<InputName, string>;

const signUpPWFormInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "email",
    label: "電子信箱",
    placeholder: "請輸入電子信箱",
    type: "email",
    options: {
      required: {
        value: true,
        message: "請輸入電子信箱",
      },
    },
  },
  {
    name: "password",
    label: "密碼",
    placeholder: "請輸入密碼",
    type: "password",
    options: {
      required: {
        value: true,
        message: "請輸入密碼",
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
    name: "checkPassword",
    label: "確認密碼",
    placeholder: "請再次輸入一次密碼",
    type: "password",
    options: {
      required: {
        value: true,
        message: "請再次輸入一次密碼",
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

function SignUpPWForm({ setPWData, setProgressNum }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignUpPW>();
  const onSubmit = (data: TSignUpPW) => {
    if (data.password !== data.checkPassword) {
      setError("checkPassword", {
        type: "manual",
        message: "密碼和確認密碼不相同",
      });
      return;
    } else {
      setPWData(data);
      setProgressNum(2);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {signUpPWFormInputs.map((input: IReactHookFormInput<InputName>) => {
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
      <input
        type="submit"
        value="下一步"
        className="btn btn-light fw-bold w-100 mb-4"
      />
    </form>
  );
}

export default SignUpPWForm;
