// @flow
import React from 'react';
import classNames from 'classnames';
import type {ChildrenArray, Element} from 'react';
import Icon from '../Icon';
import itemStyles from './item.scss';

type Props = {
    active?: boolean,
    children?: ChildrenArray<Element<typeof Item> | false>,
    expanded?: boolean,
    icon?: string,
    onClick?: (value: string) => void,
    title: string,
    value: string,
};

export default class Item extends React.PureComponent<Props> {
    handleClick = () => {
        const {onClick, value} = this.props;

        if (!onClick) {
            return;
        }

        onClick(value);
    };

    render() {
        const {title, children, expanded, icon} = this.props;
        let {active} = this.props;

        // check for active children
        if (children) {
            React.Children.forEach(children, (child: Element<typeof Item>) => {
                if (child.props.active) {
                    active = true;
                }
            });
        }

        const itemClass = classNames(
            itemStyles.item,
            {
                [itemStyles.active]: active,
            }
        );

        return (
            <div className={itemClass}>
                <div className={itemStyles.title} onClick={this.handleClick} role="button">
                    {icon && <Icon name={icon} />}
                    {title}
                </div>
                {expanded && children &&
                    <div>{children}</div>
                }
                {children &&
                    <Icon
                        className={itemStyles.childrenIndicator}
                        name={expanded ? 'su-angle-down' : 'su-angle-right'}
                        onClick={this.handleClick}
                    />
                }
            </div>
        );
    }
}
