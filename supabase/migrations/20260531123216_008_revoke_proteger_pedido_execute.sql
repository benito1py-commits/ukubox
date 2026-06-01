-- proteger_pedido() es una función de trigger: no debe ser invocable vía RPC.
-- El trigger la ejecuta con los privilegios del owner, así que revocar EXECUTE
-- a los roles expuestos no rompe nada y cierra el advisor de seguridad.
revoke execute on function public.proteger_pedido() from anon, authenticated, public;
