// @flow
import React from 'react';
import {computed} from 'mobx';
import {observer} from 'mobx-react';
import {Breadcrumb} from 'sulu-admin-bundle/components';
import {translate} from 'sulu-admin-bundle/utils';
import {ResourceStore} from 'sulu-admin-bundle/stores';
import type {BreadcrumbItem} from './types';

type Props = {
    onNavigate: (collectionId?: string | number) => void,
    resourceStore: ResourceStore,
};

@observer
class CollectionBreadcrumb extends React.Component<Props> {
    static getCurrentCollectionItem(data: Object): BreadcrumbItem {
        return {
            id: data.id,
            title: data.title,
        };
    }

    @computed get current(): ?BreadcrumbItem {
        const {resourceStore} = this.props;
        const {data} = resourceStore;

        if (!data._embedded) {
            return null;
        }

        return CollectionBreadcrumb.getCurrentCollectionItem(data);
    }

    @computed get parent(): ?BreadcrumbItem {
        const {resourceStore} = this.props;
        const {data} = resourceStore;

        if (!data._embedded) {
            return null;
        }

        return data._embedded.parent ?? null;
    }

    handleNavigate = (collectionId?: string | number) => {
        this.props.onNavigate(collectionId);
    };

    render() {
        const Item = Breadcrumb.Item;
        const parent = this.parent;
        const current = this.current;
        const rootItemTitle = translate('sulu_media.all_media');

        if (!parent || !current) {
            return (
                <Breadcrumb>
                    <Item>{rootItemTitle}</Item>
                </Breadcrumb>
            );
        }

        return (
            <Breadcrumb onItemClick={this.handleNavigate}>
                <Item>{rootItemTitle}</Item>
                <Item value={parent.id}>...</Item>
                <Item>{current.title}</Item>
            </Breadcrumb>
        );
    }
}

export default CollectionBreadcrumb;
