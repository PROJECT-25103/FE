import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMessage } from "../../../../common/hooks/useMessage";
import { formRules } from "../../../../common/utils/formRule";
import { uploadImage } from "../../../../common/utils/upLoadImage";
import UploadImage from "../../../../components/UploadImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY } from "../../../../common/constants/queryKey";
import { getAllGenre } from "../../../../common/services/genre.service";
import {
  COUNTRY_OPTIONS,
  LANGUAGE_OPTIONS,
} from "../../../../common/constants/language";
import { createMovieAPI } from "../../../../common/services/movie.service";

const CreateMovie = () => {
  const [isLoading, setLoading] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { antdMessage, HandleError } = useMessage();
  const { data: genre } = useQuery({
    queryKey: [QUERY.GENRE],
    queryFn: () => getAllGenre(),
  });
  const { mutateAsync } = useMutation({
    mutationFn: (payload) => createMovieAPI(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY.MOVIE),
      });
      nav("/admin/movies");
    },
    onError: (err) => {
      HandleError(err);
      setLoading(false);
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const posterUrl = await uploadImage(values.poster[0].originFileObj);
    if (!posterUrl) {
      setLoading(false);
      antdMessage.error("Upload ảnh thất bại");
      return;
    }
    values.poster = posterUrl;
    values.releaseDate = dayjs(values.releaseDate).format("YYYY-MM-DD");
    await mutateAsync({ ...values, isHot });
    setLoading(false);
  };
  return (
    <div className="w-full min-h-[85dvh] rounded-md shadow-md px-6 py-4 relative">
      <Link
        to={"/admin/movies"}
        className="text-black! hover:text-primary! hover:underline!"
      >
        Quay về danh sách
      </Link>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Thêm phim mới</h3>
        <div className="flex items-center gap-4">
          <Form.Item
            label="Phim nổi bật"
            name="isFeatured"
            valuePropName="checked"
          >
            <Switch
              size="default"
              style={{ transform: "scale(1.2)" }}
              onChange={(checked) => setIsHot(checked)}
            />
          </Form.Item>
        </div>
      </div>
      <div className="mt-4">
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <section className="flex items-start gap-8">
            <Form.Item
              label="Poster phim"
              name={"poster"}
              valuePropName="value"
              getValueFromEvent={(e) => e}
              rules={[{ required: true, message: "Vui lòng tải ảnh lên!" }]}
            >
              <UploadImage width={200} height={310} />
            </Form.Item>
            <div className="flex-1">
              <Form.Item
                label="Tên phim"
                name={"name"}
                required
                rules={[
                  formRules.textRange("Tên phim", 3, 60),
                  formRules.required("Tên phim"),
                ]}
              >
                <Input placeholder="Nhập tên phim" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Thời gian chiếu"
                name={"duration"}
                required
                initialValue={10}
                rules={[formRules.required("Thời gian chiếu phim")]}
              >
                <InputNumber
                  min={10}
                  max={360}
                  className="custom-input-number"
                  placeholder="Nhập số phút chiếu phim"
                  addonAfter={"Phút"}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Thể loại phim"
                name={"category"}
                required
                rules={[formRules.required("Thể loại phim", true)]}
              >
                <Select
                  mode="multiple"
                  placeholder="Thể loại"
                  style={{ width: "100%", height: 35 }}
                  options={genre?.data?.map((item) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Phim dành cho lứa tuổi"
                name={"ageRequire"}
                required
                rules={[formRules.required("Vui lòng chọn lứa tuổi phù hợp")]}
              >
                <Select
                  placeholder="Chọn độ tuổi"
                  style={{ width: "100%", height: 35 }}
                  options={[
                    { value: "P", label: "P - Phù hợp với mọi lứa tuổi" },
                    { value: "K", label: "K - Dành cho trẻ em" },
                    { value: "C13", label: "C13 - Cấm khán giả dưới 13 tuổi" },
                    { value: "C16", label: "C16 - Cấm khán giả dưới 16 tuổi" },
                    { value: "C18", label: "C18 - Cấm khán giả dưới 18 tuổi" },
                  ]}
                />
              </Form.Item>
            </div>
          </section>
          <section className="flex flex-col items-center gap-2">
            <div className="w-full flex gap-6">
              <Form.Item
                label="Quốc gia"
                style={{
                  flex: 1,
                }}
                name={"country"}
                required
                rules={[formRules.required("Quốc gia", true)]}
              >
                <Select
                  showSearch
                  placeholder="Chọn ngôn ngữ của phim"
                  options={COUNTRY_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="Ngôn ngữ"
                style={{
                  flex: 1,
                }}
                name={"language"}
                required
                rules={[formRules.required("Ngôn ngữ", true)]}
              >
                <Select
                  showSearch
                  placeholder="Chọn ngôn ngữ của phim"
                  options={LANGUAGE_OPTIONS}
                />
              </Form.Item>
              <Form.Item
                label="Phụ đề (Không bắt buộc)"
                style={{
                  flex: 1,
                }}
                name={"subTitleLanguage"}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="Phụ đề của phim"
                  options={LANGUAGE_OPTIONS}
                />
              </Form.Item>
            </div>
            <div className="w-full flex gap-6">
              <Form.Item
                label="Đạo diễn"
                name={"director"}
                style={{
                  flex: 1,
                }}
                tooltip="Nhập tên một diễn viên bất kỳ và enter bạn có thể nhập được tên diễn viên tiếp theo"
                required
                rules={[
                  { required: true, message: "Vui lòng nhập tên đạo diễn" },
                ]}
              >
                <Input placeholder="Nhập tên đạo diễn" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Diễn viên"
                name={"actor"}
                tooltip="Nhập tên một diễn viên bất kỳ và enter bạn có thể nhập được tên diễn viên tiếp theo"
                required
                style={{
                  flex: 1,
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập danh sách diễn viên",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  suffixIcon={null}
                  placeholder="Nhập tên diễn viên và nhấn Enter"
                  style={{ width: "100%", height: 35 }}
                  tokenSeparators={[","]}
                  open={false}
                />
              </Form.Item>
            </div>
            <div className="w-full flex gap-6">
              <Form.Item
                style={{
                  flex: 1,
                }}
                label="Trailer youtube"
                name={"trailer"}
              >
                <Input placeholder="Nhập link youtube" style={{ height: 35 }} />
              </Form.Item>
              <Form.Item
                label="Ngày công chiếu"
                name={"releaseDate"}
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày công chiếu",
                  },
                ]}
                style={{
                  flex: 1,
                }}
              >
                <DatePicker
                  placeholder="Chọn ngày công chiếu"
                  style={{ height: 35, width: "100%" }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>
            </div>
          </section>
          <Form.Item label="Mô tả phim" name={"description"}>
            <TextArea rows={5} placeholder="Nhập mô tả phim" />
          </Form.Item>

          <div className="flex justify-end gap-6 mt-6">
            <Button
              disabled={isLoading}
              style={{ width: 150, height: 35 }}
              htmlType="reset"
            >
              Đặt lại
            </Button>
            <Button
              loading={isLoading}
              disabled={isLoading}
              style={{ width: 150, height: 35 }}
              htmlType="submit"
              type="primary"
            >
              Thêm mới
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateMovie;