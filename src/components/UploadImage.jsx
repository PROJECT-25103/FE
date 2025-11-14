import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import { useEffect, useState } from "react";

export default function UploadImage({
  width = 200,
  height = 300,
  value,
  onChange,
}) {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (typeof value === "string") {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: value,
        },
      ]);
    } else if (Array.isArray(value)) {
      setFileList(value);
    } else {
      setFileList([]);
    }
  }, [value]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  const handleRemove = () => {
    setFileList([]);
    onChange?.([]);
  };

  return (
    <Upload
      listType="picture-card"
      maxCount={1}
      beforeUpload={() => false}
      fileList={fileList}
      onChange={handleChange}
      showUploadList={false}
      style={{ width, height }}
    >
      {fileList.length ? (
        <div
          className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={
              fileList[0].url || URL.createObjectURL(fileList[0].originFileObj)
            }
            alt="uploaded"
            width="100%"
            height="100%"
            style={{ objectFit: "cover", borderRadius: 8 }}
            preview={false}
          />
          <div className="absolute top-1.5 right-1.5 z-10">
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <PlusOutlined />
          <div className="mt-2 text-sm">Tải lên</div>
        </div>
      )}
    </Upload>
  );
}