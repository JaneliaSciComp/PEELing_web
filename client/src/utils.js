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

export const cellCompartmentList = [
  {label: 'Cell Surface', value: 'cs'},
  {label: 'Mitochondrion', value: 'mt'},
  {label: 'Nucleus', value: 'nu'},
  {label: 'Other (Custom TP / FP lists)', value: 'ot'}
];

export function cellCompartmentNameFromAbbr(abbreviation) {
    const match = cellCompartmentList.filter(comp => comp.value === abbreviation)[0]
    if (match) {
        return match.label;
    }
    return 'Other (Custom TP / FP lists)'
}
