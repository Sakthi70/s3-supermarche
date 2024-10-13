import { Box, Button, Card, CircularProgress, Divider, FormHelperText, Grid2, TextField } from '@mui/material'
import DropZone from 'components/DropZone';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { StyledClear, UploadImageBox } from '../styles';
import { hexToDecimal, t } from 'utils/util';
import * as yup from "yup";
import _ from 'lodash';
import PageContentWithEditor from "components/utils/PageContentWithEditor";
import { ColorPicker } from 'mui-color';
import useApp from 'hooks/useApp';
import { deleteUpload, imageUpload } from 'utils/cloudinary';
import { createPage, updatePage } from 'actions/pages';


const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required(t("Name is required")),
    // content: yup.string().required(t("Content is required")),
});

const PageForm = ({ isEdit, page = {} }) => {
    const router = useRouter();
    const { loading } = useApp();
    const rteref = useRef(null);
    const INITIAL_VALUES = {
        name: "",
        content: "",
        color: hexToDecimal('#333'),
        image: null
    };


    const handleFormSubmit = async (values) => {
        loading(true);
        if (isEdit) {
                if(page.image && page.image !== values.image){
                    await deleteUpload(page.image, "DynamicPage");
                }
                let result = null;
                if (values.image && _.isObject(values.image)) {
                    result = await imageUpload(values.image, 'DynamicPage');
                } else {
                    result = values.image
                }
                await updatePage({ ...values, content: rteref.current?.editor?.getHTML(), image: result }).then(values => {
                    router.replace('/admin/pages');
                });
        } else {
            let result = null;
            if (values.image && _.isObject(values.image)) {
                result = await imageUpload(values.image, 'DynamicPage');
            } else {
                result = values.image
            }
            await createPage({ ...values, content: rteref.current?.editor?.getHTML(), image: result, pageId: _.camelCase(values.name) }).then(values => {
                router.replace('/admin/pages');
            });
        }
        loading(false)
    }



    if (isEdit && _.isEmpty(page)) {
        return <Box height={400} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
    }
    return (
        <Card className="p-3">
            <Formik initialValues={isEdit ? { ...page } : INITIAL_VALUES} onSubmit={handleFormSubmit} validationSchema={VALIDATION_SCHEMA}>
                {
                    ({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        handleSubmit }) => {
                        const handleChangeDropZone = (files) => {
                            files.forEach((file) =>
                                Object.assign(file, {
                                    preview: URL.createObjectURL(file),
                                })
                            );

                            setFieldValue('image', files[0]);
                        };

                        return <form onSubmit={handleSubmit}>
                            <Grid2 container spacing={3}>
                                <Grid2 size={{ xs: 12, sm: 6 }}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label={t("Name")}
                                            color="info"
                                            size="medium"
                                            disabled={isEdit}
                                            placeholder={t("Name")}
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            helperText={touched.name && errors.name}
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        <ColorPicker
                                            hideTextfield
                                            disableAlpha
                                            value={values.color}
                                            defaultValue="transparent"
                                            onChange={(colorval) =>
                                                setFieldValue(`color`, colorval.value)
                                            }
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 6 }}>


                                </Grid2>
                                {!values.image && <Grid2 size={{ xs: 12 }} item >
                                    {!values.image &&
                                        <DropZone
                                            isBoth={true}
                                            urlTitle="Page Image"
                                            multiple={false}
                                            urlValues={values.image && !_.isObject(values.image) ? values.image : ""}
                                            setFieldValue={(name, val) => { if (val) { setFieldValue('image', val) } }}
                                            title={t("Drop & drag page image")}
                                            onChange={(files) => handleChangeDropZone(files)}
                                        />
                                    }

                                    {/* {values.image && <Image src={_.isObject(values.image) ? values.image.preview : values.image} />} */}
                                </Grid2>}

                                {values.image && <Grid2 item size={{ xs: 12 }}>

                                    <Box position={'relative'} display={'flex'} width={1} height={200}>
                                        <Box component="img" alt={t("Page")} sx={{ objectFit: 'cover' }} src={values.image && !_.isObject(values.image) ? values.image : values.image.preview} height={1} width="100%" />
                                        <StyledClear onClick={() => setFieldValue('image', null)} />
                                    </Box>
                                </Grid2>}
                                <Grid2 size={{ xs: 12 }}>
                                    <PageContentWithEditor value={values.content} rteRef={rteref} />
                                    {Boolean(touched.content && errors.content) && <FormHelperText error={Boolean(touched.content && errors.content)}>{touched.content && errors.content}</FormHelperText>}
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <Divider />
                                </Grid2>
                                <Grid2 size={{ xs: 12 }}>
                                    <Box display={'flex'} justifyContent={'end'} gap={2}>
                                        <Button color='primary' onClick={() => router.replace("/admin/pages")}> {'Cancel'}</Button>
                                        <Button color='primary' variant='contained' type="submit"> {isEdit ? 'Update' : 'Create'}</Button>
                                    </Box>
                                </Grid2>
                            </Grid2>

                        </form>
                    }
                }
            </Formik>
        </Card>
    )
}

export default PageForm