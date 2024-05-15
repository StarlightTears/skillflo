import { useEffect } from 'react';
import { Params, useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface DeprecatedRouteProps {
  to: string | ((context: { searchParams: URLSearchParams; params: Params }) => string);
}

const DeprecatedRoute = ({ to }: DeprecatedRouteProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const url = typeof to === 'string' ? to : to({ searchParams, params });
    navigate(url, { replace: true });
  }, []);

  return null;
};

export default DeprecatedRoute;
