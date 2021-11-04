import React, { useState } from 'react'
import { Typography, Button, Form, message, Icon, Input} from 'antd'
import Dropzone from 'react-dropzone'

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

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            
                <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form onSubmit>
                    <div style={{ display:'flex', justifyContent:'space-between'}}>
                        {/* Drop Zone */}
                        <Dropzone
                        onDrop
                        mulitiple
                        maxSize
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
                        <div>
                            <img src alt/>
                        </div>
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