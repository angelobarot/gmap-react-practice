import { withScriptjs, withGoogleMap } from 'react-google-maps';

const googleMapHoc = withScriptjs(withGoogleMap((props) => props.children));

export default googleMapHoc;