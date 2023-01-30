import { Node } from 'reactflow';

interface IParameter {
  name: string;
  type: string;
}

interface IFunction {
  title: string;
  description: string;
  parameters: IParameter[];
  returnType: string;
}

/**
 * Subject to change.
 * A custom node which represents a function in a database.
 * 
 * SUPPORTED FUNCTION TYPES:
 * - BEFORE
 * - AFTER
 * - INSTEAD OF
 * 
 * SUPPORTED FUNCTION EVENTS:
 * - INSERT
 * - UPDATE
 * - DELETE
 */
export type FunctionNode = Node<IFunction, 'function'>;