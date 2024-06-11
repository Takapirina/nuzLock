import ComponentMenu from '../../component/componentMenu';
import './widgetMenu.scss'

interface WidgetMenuProps{
    className: string;
}

function WidgetMenu({className}:WidgetMenuProps) {
    return (
        <>
        <ComponentMenu className={className}>
            <button>Andriy</button>
            <button>Mostro qualcosa</button>
            <button>Salva</button>
            <button>Qualcos'altro</button>
        </ComponentMenu>
        </>
    )
}
export default WidgetMenu;