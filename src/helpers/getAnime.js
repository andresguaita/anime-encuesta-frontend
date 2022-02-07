import axios from "axios"

export const getAnimeData = async(name) =>{
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${name}&limit=5`)
    const anime= response.data.data.map(res => {
        return{
        id: res.mal_id,
        title: res.title,
        image: res.images.jpg.image_url,
        released:res.aired.prop.from.year,
        }
    })

    return anime
}