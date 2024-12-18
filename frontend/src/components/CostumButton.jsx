import { Button } from "antd"


export const CostumButton = ({children, loading, ...props}) => {
    return (
        <Button block type="primary" {...props} disabled={loading}>
            {loading ? 'Processing...': children}
        </Button>
    )
    
}