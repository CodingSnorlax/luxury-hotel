import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IReactHookFormInput } from "../interface/ReactHookForm";
import { apiGetUser, apiPutUser } from "../apis/userApis";
import Loading from "../components/Loading";
import Toasts from "../components/Toasts";

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
    reset,
  } = useForm<TUpdatePW>();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastsMessage, setToastsMessage] = useState("");
  const onSubmit = async (data: TUpdatePW) => {
    setLoading(true);
    try {
      if (data.newPassword !== data.checkNewPassword) {
        setError("checkNewPassword", {
          type: "manual",
          message: "新密碼和確認新密碼不相同",
        });
        return;
      }
      const user = await apiGetUser();

      if (user) {
        const submitData = {
          userId: user.data.result._id,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        };
        await apiPutUser(submitData);
        setShow(true);
        setLoading(false);
        setToastsMessage("密碼已更新");
      }
    } catch (err) {
      setShow(true);
      setLoading(false);
      setToastsMessage("密碼更新失敗");
    }
    reset();
  };

  useEffect(() => {
    setShow(false);
  }, [show]);

  return (
    <>
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
        {/* <input type="submit" value="儲存設定" className="btn btn-secondary" /> */}
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ width: "128px" }}
        >
          {loading && <Loading />}
          {!loading && "儲存設定"}
        </button>
      </form>
      <Toasts isVisible={show} message={toastsMessage} />
    </>
  );
}

export default UpdatePWForm;
