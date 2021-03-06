<?php

/**
 * @see       https://github.com/laminas/laminas-mvc for the canonical source repository
 * @copyright https://github.com/laminas/laminas-mvc/blob/master/COPYRIGHT.md
 * @license   https://github.com/laminas/laminas-mvc/blob/master/LICENSE.md New BSD License
 */

namespace Laminas\Mvc\Service;

use Laminas\Log\ProcessorPluginManager as LogProcessorPluginManager;

class LogProcessorManagerFactory extends AbstractPluginManagerFactory
{
    const PLUGIN_MANAGER_CLASS = LogProcessorPluginManager::class;
}
