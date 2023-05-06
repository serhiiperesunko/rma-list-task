import {Oval} from "react-loader-spinner";
import styles from './Loader.module.css'

const Loader = () => {
    return <Oval
        height={20}
        width={20}
        color="black"
        wrapperClass={styles.spinner}
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
    />
}

export default Loader