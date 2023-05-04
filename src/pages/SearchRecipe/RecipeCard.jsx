import * as React from 'react';
import {Card,Divider,Typography,AspectRatio} from '@mui/material';
import ApiCard from './ApiCard';
import SpoonacularCard from './SpoonacularCard';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, src, setRefresh}) => {
    const navigate=useNavigate()
const handelClick=()=>{
    if(src=="spoonacular")
        navigate(`/spoonacular/show?recipeId=${recipe?.id}`)
    else 
        // navigate(`/Api/show?recipeId=${recipe?.id}`)
        navigate(`/Api/show?recipeId=1`)

}
    return (
        <Card onClick={handelClick} variant="outlined"
            sx={{
                minWidth: "320px", maxWidth: "320px", m: 2.5, borderWidth: 0,
                '&:hover': { boxShadow: '6px 6px 2px 1px rgba(189, 104, 109, .2)' },
            }}>
            <div>
                <div ratio="1.75">
                    <img border="none" outline="none"
                        src={recipe.image?recipe.image:"https://spoonacular.com/recipeImages/641395-312x231.jpg"}
                        loading="lazy"
                        alt=""
                    />
                </div>
                {src == "api" ? <ApiCard setRefresh={setRefresh} recipe={recipe}/> : <SpoonacularCard recipe={recipe}/>}
            </div>
            <div style={{ height: 50 }}>
                <Typography level="h4" sx={{ fontSize: '32', mt: 2, fontWeight: '10' }}>
                    {src == "api" ? recipe.name : recipe?.title}
                </Typography>
            </div>
            <Divider />
            <Card
                variant="soft"
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    // px: 'var(--Card-padding)',
                    bgcolor: 'background.level1',
                }}
            >
                <Typography level="body1" sx={{ fontWeight: '20', color: 'text.secondary' }}>
                    &#9201; {recipe.preperingTime} minutes
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body1" sx={{ fontWeight: '20', color: 'text.secondary' }}>
                    &#127860; {recipe.serves} servings
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body1" sx={{ fontWeight: '20', color: 'text.secondary' }}>
                    {src == "api" ? <span>&#128507; {recipe.difficult}</span> : <span>&#128077; {recipe.aggregateLikes} likes</span>}
                </Typography>
            </Card>
        </Card>
    );

}
export default RecipeCard