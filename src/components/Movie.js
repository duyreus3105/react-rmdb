import React, {Component} from 'react'
import {useParams} from 'react-router-dom';
//Config
import {IMAGE_BASE_URL, POSTER_SIZE} from '../config'
//API
import API from '../API'
//components
import Grid from './Grid'
import Spinner from './Spinner'
import BreadCrumb from './BreadCrumb'
import MovieInfo from './MovieInfo'
import MovieInfoBar from './MovieInfoBar'
import Actor from './Actor'

//image
import NoImage from '../images/no_image.jpg'
class Movie extends Component {
    
    state = {
        movie : {},
        loading: false,
        error: false,
    }

    fetchMovie = async () => {
        const {movieId} = this.props.params
        try{
            this.setState({error: false, loading: true})

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            const actors = credits.cast;
            //Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            this.setState({
                movie: {
                    ...movie,
                    actors,
                    directors
                },
                loading: false
            })
        }catch(error){
            this.setState({error: true, loading: false})
        }
    };

    componentDidMount(){
        this.fetchMovie();
    }

    render() {
        const {movie, loading, error} = this.state;
        if(loading) return <Spinner/>;
        if(error) return <div>Something went wrong...</div>;
        
        return (
            <React.Fragment>
                <BreadCrumb movieTitle={movie.original_title}/>
                <MovieInfo movie ={movie}/>
                <MovieInfoBar
                    time = {movie.runtime}
                    budget = {movie.budget}
                    revenue = {movie.revenue}
                />
                <Grid header='Actors'>
                    {movie.actors.map(actor=>(
                        <Actor 
                            key = {actor.credit_id}
                            name ={actor.name}
                            character ={actor.character}
                            imageURL ={
                                actor.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                : NoImage
                            }
                        />    
                    ))}
                </Grid>
            </React.Fragment>
        )
    }
}

const MovieWithParams = props => <Movie {...props} params={useParams()}/>
export default MovieWithParams;