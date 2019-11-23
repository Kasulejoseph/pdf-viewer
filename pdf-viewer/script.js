
var app = new Vue({
    el: '#app',
    data: {
        file: null,
        preview: null,
        yy: null,
        pages: []
    },
    methods: {
        selectImage(page) {
            console.log('page', page, this.yy);
            this.preview = `https://res.cloudinary.com/dcsrepenv/image/upload/w_350,h_400,c_fill,pg_${page}/${this.file.public_id}.jpg`
        },
        openWidget(url) {
            window.cloudinary.openUploadWidget(
                {
                    cloud_name: 'dcsrepenv',
                    upload_preset: 'ghxq3cx3',
                    tags: ['pdf'],
                    sources: [
                        'local',
                        'url',
                        'camera',
                        'image_search',
                        'instagram'
                    ]
                },
                (error, result) => {
                    console.log(error, result);
                    this.file = result.info
                    this.yy = result.info.public_id
                    console.log('this.yy', this.yy);
                    console.log('this.file', this.file);

                    this.preview = `https://res.cloudinary.com/dcsrepenv/image/upload/w_350,h_400,c_fill,pg_1/${this.yy}.jpg`;
                    for(let i =1; i<=this.file.pages; i++) {
                        this.pages.push(
                            {
                                url: `https://res.cloudinary.com/dcsrepenv/image/upload/w_200,h_250,c_fill,pg_${i}/${this.file.public_id}.jpg`,
                                page: i
                            }
                        )
                    }

                }
            )
        }
    }
    })