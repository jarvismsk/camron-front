import Stem from './stem'
import Header from './header';
import Footer from './footer';

const Who = () => {
    return(
        <div>
            <Header/>
            <div className='mt-5 mx-3 md:mt-10'>
            <Stem/></div>
            <Footer/>
        </div>
    )
}

export default Who;