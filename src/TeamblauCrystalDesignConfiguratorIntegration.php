<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;
use Shopware\Core\Framework\Plugin\Context\DeactivateContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Core\Framework\Plugin\Context\UpdateContext;
use Shopware\Core\System\CustomField\CustomFieldTypes;

class TeamblauCrystalDesignConfiguratorIntegration extends Plugin
{
    public function activate(ActivateContext $context): void
    {
        parent::activate($context);

        /** @var EntityRepositoryInterface $customFieldSetRepository */
        $customFieldSetRepository = $this->container->get('custom_field_set.repository');
        $customFieldSetRepository->upsert($this->getCustomFieldSets(), $context->getContext());
    }

    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        $this->deleteCustomElements($context->getContext());
        if ($context->keepUserData()) {
            // User data should be keept, do nothing
            return;
        }
    }

    public function deactivate(DeactivateContext $context): void
    {
        parent::deactivate($context);
    }

    public function update(UpdateContext $context): void
    {
        parent::update($context);

        /** @var EntityRepositoryInterface $customFieldSetRepository */
        $customFieldSetRepository = $this->container->get('custom_field_set.repository');
        $customFieldSetRepository->upsert($this->getCustomFieldSets(), $context->getContext());
    }

    public function getCustomFieldSets()
    {
        return [
            [
                'id' => md5('diva_sales_channel_custom_fields'),
                'name' => 'diva_sales_channel_custom_fields',
                'config' => [
                    'label' => "Diva"
                ],
                'customFields' => [
                    [
                        'id' => md5('diva_organization_id'),
                        'name' => 'diva_organization_id',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'label' => 'Organization Id',
                            'customFieldPosition' => 1
                        ],
                    ], [
                        'id' => md5('diva_idenitifier'),
                        'name' => 'diva_idenitifier',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'label' => 'Idenitifier',
                            'customFieldPosition' => 2
                        ],
                    ], [
                        'id' => md5('diva_default_api_config'),
                        'name' => 'diva_default_api_config',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Default Api Config',
                                'en-GB' => 'Default Api Config',
                                'it-IT' => 'Default Api Config'
                            ],
                            'customFieldPosition' => 3
                        ],
                    ], [
                        'id' => md5('diva_base_url'),
                        'name' => 'diva_base_url',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Base Url',
                                'en-GB' => 'Base Url',
                                'it-IT' => 'Base Url'
                            ],
                            'customFieldPosition' => 4
                        ],
                    ]
                ],
                'relations' => [
                    [
                        'id' => md5('diva_sales_channel_relations'),
                        'entityName' => 'sales_channel',
                    ]
                ]
            ], [
                'id' => md5('diva_product_custom_fields'),
                'name' => 'diva_product_custom_fields',
                'config' => [
                    'label' => [
                        'de-DE' => 'Diva Eigenschaften',
                        'en-GB' => 'Diva Custom Fields',
                        'it-IT' => 'Caratteristiche Diva'
                    ],
                    'translated' => true
                ],
                'customFields' => [
                    [
                        'id' => md5('diva_product_id'),
                        'name' => 'diva_product_id',
                        'type' => CustomFieldTypes::TEXT,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Diva Produkt Id',
                                'en-GB' => 'Diva Product Id',
                                'it-IT' => 'Id prodotto Diva'
                            ],
                            'customFieldPosition' => 1
                        ],
                    ], [
                        'id' => md5('diva_product'),
                        'name' => 'diva_product',
                        'type' => CustomFieldTypes::BOOL,
                        'config' => [
                            'label' => [
                                'de-DE' => 'Diva Produkt',
                                'en-GB' => 'Diva Product',
                                'it-IT' => 'Prodotto Diva'
                            ],
                            'componentName' => 'sw-field',
                            'customFieldType' => 'checkbox'
                        ],
                        'customFieldPosition' => 2
                    ]
                ],
                'relations' => [
                    [
                        'id' => md5('ProductDefinitionDiva'),
                        'entityName' => $this->container->get(ProductDefinition::class)->getEntityName(),
                    ]
                ]
            ]
        ];
    }

    private function deleteCustomElements(Context $context)
    {
        /**
         * We can safely delete the customField set and the customFields.
         * The customField data attached to the entities is not deleted.
         * Instead, it will not be hydrated anymore. After recreating
         * the custom field with the same name, the data will be accessible again.
         */

        $ids = [];
        foreach ($this->getCustomFieldSets() as $sets) {
            $ids[] = ['id' => $sets['id']];
        }
        $customFieldSetRepository = $this->container->get('custom_field_set.repository');
        $customFieldSetRepository->delete($ids, $context);
    }
}