import { Node } from 'reactflow';

interface IParameter {
  name: string;
  type: string;
}

interface ITrigger {
  title: string;
  description: string;
  parameters: IParameter[];
  returnType: string;
}

/**
 * Subject to change.
 * A custom node which represents a trigger in a database.
 * 
 * SUPPORTED TRIGGER TYPES:
 * - BEFORE
 * - AFTER
 * - INSTEAD OF
 * 
 * SUPPORTED TRIGGER EVENTS:
 * - INSERT
 * - UPDATE
 * - DELETE
 */
export type TriggerNode = Node<ITrigger, 'trigger'>;