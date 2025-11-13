import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router";
import { useMessage } from "../../../common/hooks/useMessage";
import { loginService } from "../../../common/services/auth.service";
import { formRules } from "../../../common/utils/formRule";
const LoginPage =() =>{
    const[form] =Form.useForm();
    const nav = useNavigate();
    const {HandleError, antdMessage}= useMessage();
    const{mutate, isPending} = useMutation({
        mutationFn:(payload)=>loginService(payload),
        onSuccess:({message})=>{
            antdMessage.success(message);
            nav("/auth/register");
        }, 
        onError:(err)=> HandleError(err),
    });
    const handleSubmit = async(values)=>{
        mutate(values);
    }
    return (
        <div className="flex justify-center">
          <div className="flex flex-col px-12 flex-1 max-w-3xl bg-white shadow-xl my-12 rounded-lg py-6">
            <h3 className="text-2xl text-start">Đăng nhập</h3>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label={<p className="text-base font-medium">Email</p>}
                className="flex-1"
                name={"email"}
                required
                rules={[
                  formRules.required("email"),
                  { type: "email", message: "Vui lòng nhập đúng định dạng email!" },
                ]}
              >
                <Input
                  style={{ height: 45, boxShadow: "none" }}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                label={<p className="text-base font-medium">Mật khẩu</p>}
                className="flex-1"
                name={"password"}
                required
                hasFeedback
                rules={[formRules.required("Mật khẩu")]}
              >
                <Input.Password
                  style={{ height: 45, boxShadow: "none" }}
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item className="mt-4!">
                <Button
                  disabled={isPending}
                  loading={isPending}
                  htmlType="submit"
                  style={{
                    background: `var(--color-primary)`,
                    height: 45,
                    width: "100%",
                    color: "white",
                  }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <p className="text-center">
                Bạn đã chưa có?{" "}
                <Link
                  to={"/auth/register"}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Đăng ký
                </Link>
              </p>
            </Form>
          </div>
        </div>
      );
}
export default LoginPage;