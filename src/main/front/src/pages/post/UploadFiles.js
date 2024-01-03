import React, {
    useState,
    useRef,
    useImperativeHandle,
    forwardRef
} from "react";
import FileUploadService from "../api/FileUploadService";

const UploadFiles = forwardRef((props, ref) => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [message, setMessage] = useState("");

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    //NoticeWriteComponent에서 저장버튼을 클릭 시, 파일 업로드를 실행하기 위해서
    //useImperativeHandle이라는 hook을 사용한다.
    useImperativeHandle(ref, () => ({
        upload: () => {
            return new Promise((resolve, reject) => {

                if (selectedFiles) {

                    let result = FileUploadService.upload(selectedFiles)
                        .then((response) => {
                            setMessage(response.data.message);
                            resolve(response.data.files);
                            //return UploadService.getFiles();
                        })
                        .catch((err) => {

                            fileInput.current.value = '';
                            setSelectedFiles(undefined);
                            if (err.response.data.message) {
                                setMessage(err.response.data.message);
                            } else {
                                setMessage("Could not upload the file!");
                            }
                            reject();
                        });
                } else {

                    resolve([]);
                }


            })
        }
    }));

    const fileInput = useRef();

    return (
        <div className="form-group">

            <label className="btn btn-default">
                <input type="file" onChange={selectFile} ref={fileInput} multiple />
            </label>

            <div className="alert alert-light" role="alert" style={{color:'red'}}>
                {message}
            </div>

        </div>
    )

});

export default UploadFiles;