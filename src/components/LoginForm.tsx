import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";
import { Link } from "react-router-dom";
import { PWData } from "../interface/Form";
import Loading from "../components/Loading";

interface Props {
  handleLogin: (PWData: PWData) => void;
  loading: boolean;
}
type InputName = "email" | "password";
type TLogin = Record<InputName, string>;

const loginFormInputs: Array<IReactHookFormInput<InputName>> = [
  {
    name: "email",
    label: "電子信箱",
    placeholder: "hello@example.com",
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
    },
  },
];

function LoginForm({ handleLogin, loading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();
  const onSubmit = (data: TLogin) => {
    handleLogin(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loginFormInputs.map((input: IReactHookFormInput<InputName>) => {
        return (
          <div className="mb-4" key={input.name}>
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
      <div className="d-flex justify-content-between mb-10">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberAccount"
          />
          <label className="form-check-label fw-bold" htmlFor="rememberAccount">
            記住帳號
          </label>
        </div>
        <Link className="text-primary" to="/">
          忘記密碼？
        </Link>
      </div>
      <button type="submit" className="btn btn-light fw-bold w-100 mb-10">
        {loading ? <Loading /> : "會員登入"}
      </button>
    </form>
  );
}

export default LoginForm;
