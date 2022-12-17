import {
    useParams,
    useNavigate,
  } from 'react-router-dom';
  
export default function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate();
        let params = useParams();

        return (
            <Component {...props}
            router={{navigate, params}}
            />
        )
    }

    return ComponentWithRouterProp;
}
  