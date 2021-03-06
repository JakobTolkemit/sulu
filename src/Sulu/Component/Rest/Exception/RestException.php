<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\Exception;

use Exception;

class RestException extends Exception
{
    public function toArray()
    {
        return [
            'code' => $this->code,
            'message' => $this->message,
        ];
    }
}
