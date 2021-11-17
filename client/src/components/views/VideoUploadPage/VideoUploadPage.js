import React, { useState } from 'react'
import { Typography, Button, Form, message, Icon, Input} from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: 'private'},
    {value: 1, label: 'public'}
]

const CategoryOptions = [
    {value: 0, label: 'flim'},
    {value: 1, label: 'pets'},
    {value: 2, label: 'music'},
    {value: 3, label: 'games'}
]


function VideoUploadPage ( ) {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("film")
    const [FilePath, setFilePath] = useState("")
    const [Durations, setDurations] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChane = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header:{ 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if (response.data.success) {

                let variable = {
                    url: response.data.url,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.url)

                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if (response.data.success) {
                        //성공시 state에 썸네일경로, 영화러닝타임 정보 저장
                        setDurations(response.data.fileDuration)
                        setThumbnailPath(response.data.url)
                        console.log(response.data)
                    } else {
                        alert('썸네일 생성 실패했습니다!')
                    }
                })

            } else {
                alert('비디오 업로드를 실패했습니다!')
            }
        })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            
                <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form onSubmit>
                    <div style={{ display:'flex', justifyContent:'space-between'}}>
                        {/* Drop Zone */}
                        <Dropzone
                        onDrop={onDrop}
                        mulitiple={false}
                        maxSize={1000000000}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                                alignItems:'center', justifyContent:'center'}} 
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type='plus' style={{ fontSize:'3rem'}} />
                            </div>
                        )}
                        </Dropzone>

                        {/* Thumbnail */}
                        {ThumbnailPath &&
                            <div>
                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"/>
                            </div>
                        }
                    </div>

                    <br/>
                    <br/>

                    <label>Title</label>
                    <Input 
                        onChange={onTitleChane}
                        value={VideoTitle}
                    />

                    <br/>
                    <br/>

                    <label>Description</label>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value={Description}
                    />

                    <br/>
                    <br/>

                    <select onChange={onPrivateChange}> 
                        {PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>

                    <br/>
                    <br/>

                    <select onChange={onCategoryChange}> 
                        {CategoryOptions.map((category, index) => (
                            <option key={index} value={category.value}>{category.label}</option>
                        ))}
                    </select>

                    <br/>
                    <br/>

                    <Button type="primary" size="large" onClick>
                        Submit
                    </Button>
                </Form>
            
            

        </div>
    )
}

export default VideoUploadPage