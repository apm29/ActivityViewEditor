<template>
    <div style="height: 100%;width: 100%;display: flex;justify-content: center">
        <Card class="form-basic-container">
            <Form>
                <FormItem label="流程名称">
                    <Input placeholder="输入流程名称"></Input>
                </FormItem>
                <FormItem label="分组">
                    <Input placeholder="输入分组"></Input>
                </FormItem>
                <FormItem label="说明文字">
                    <Input placeholder="输入说明文字"
                    ></Input>
                </FormItem>
                <FormItem label="图标">
                    <Upload
                            type="drag"
                            accept="image/*"
                            action="http://axj.ciih.net/business/upload/uploadFile">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或拖拽文件到此处</p>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
        </Card>

    </div>
</template>

<script>
  export default {
    name: 'XFormBasicConfig',
  }
</script>

<style scoped>
    .form-basic-container {
        width: 400px;
        padding: 16px 12px;
        margin: 16px 12px;
    }
</style>
