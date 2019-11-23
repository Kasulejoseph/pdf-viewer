
var app = new Vue({
    el: '#app',
    data: {
        file: null,
        preview: null,
        imageArray: [],
        pages: []
    },
    methods: {
        selectImage(page) {
            const public_id = this.imageArray.filter(element => typeof(element) === "string")
            this.preview = `https://res.cloudinary.com/dcsrepenv/image/upload/q_100,dn_50,w_350,h_400,c_fill,pg_${page}/${public_id[0]}.jpg`
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
                    this.imageArray.push(result.info.public_id)
                    const public_id = this.imageArray.filter(element => typeof(element) === "string")
                    this.preview = `https://res.cloudinary.com/dcsrepenv/image/upload/q_100,dn_50,w_350,h_400,c_fill,pg_1/${public_id[0]}.jpg`;
                    for(let i =1; i<=this.file.pages; i++) {
                        this.pages.push(
                            {
                                url: `https://res.cloudinary.com/dcsrepenv/image/upload/q_100,dn_50,w_200,h_250,c_fill,pg_${i}/${this.file.public_id}.jpg`,
                                page: i
                            }
                        )
                    }

                }
            )
        }
    }
    })